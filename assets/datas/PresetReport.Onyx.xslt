<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="html" version="1.1" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<xsl:element name="html">
			<xsl:element name="head">
				<xsl:element name="link"><xsl:attribute name="rel">stylesheet</xsl:attribute><xsl:attribute name="type">text/css</xsl:attribute><xsl:attribute name="href">PresetReport.Onyx.css</xsl:attribute></xsl:element>
				<xsl:element name="title">&quot;<xsl:value-of select="Presets/@showName"/>&quot; - Onyx Preset Values usage Report</xsl:element>
			</xsl:element>
			<xsl:element name="body">
				<xsl:element name="h1">&quot;<xsl:value-of select="Presets/@showName"/>&quot; - Onyx Preset Values usage Report</xsl:element>
				<xsl:element name="p">
					<xsl:attribute name="class">body</xsl:attribute>
					This report lists fixture's values usage from presets for show &quot;<xsl:value-of select="Presets/@showName"/>&quot;
				  <xsl:element name="b">
				    (requires software build
				    <xsl:if test="Presets/@showBuild &gt; 65535">
				      <xsl:value-of select="(Presets/@showBuild - (Presets/@showBuild mod 16777216)) div 16777216"/><xsl:text>.</xsl:text>
				      <xsl:value-of select="((Presets/@showBuild - (Presets/@showBuild mod 65536)) div 65536) mod 256"/><xsl:text>.</xsl:text>
				    </xsl:if>
				    <xsl:value-of select="Presets/@showBuild mod 65536"/><xsl:text>)</xsl:text>
				  </xsl:element>
				  <xsl:text>.</xsl:text>
				</xsl:element>
				<xsl:apply-templates select="@* | node()"/>
<!--
				<xsl:element name="p">
					<xsl:attribute name="class">body</xsl:attribute>
					Page last updated: <xsl:value-of select="Manufacturers/@time"/> CET
				</xsl:element>
-->
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Presets">
		<xsl:element name="p">
			<xsl:attribute name="class">body</xsl:attribute>
			Statistics: <xsl:value-of select="@cnt"/> presets (<xsl:value-of select="@cntInUse"/> in use / <xsl:value-of select="@cntUnused"/> unused / <xsl:value-of select="@cntEmpty"/> empty)
		</xsl:element>
		<xsl:element name="table">
			<xsl:attribute name="class">table</xsl:attribute>
			<!-- <xsl:attribute name="border">1</xsl:attribute> -->
			<xsl:element name="thead">
				<xsl:element name="tr">
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Preset</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Use</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Values used for fixture(s)</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Values never used for fixture(s)</xsl:element>
				</xsl:element>
				<xsl:apply-templates select="Preset"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Preset">
		<xsl:variable name="presetClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tbody">
			<xsl:element name="tr">
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$presetClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:element name="b"><xsl:value-of select="@ID"/></xsl:element>
					<xsl:element name="br"/><xsl:value-of select="@name"/>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$presetClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:for-each select="PresetUsage/Usage">
						<xsl:if test="position() != 1"><xsl:element name="br"/></xsl:if>
						<xsl:value-of select="."/>
					</xsl:for-each>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:choose>
						<xsl:when test="not(UsedValuesFor/Fixture) and not(UnusedValuesFor/Fixture)">
							<xsl:attribute name="class">
								<xsl:choose>
									<xsl:when test="$presetClass = 'bodyOdd'">bodyOddExc</xsl:when>
									<xsl:otherwise>bodyEvenExc</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
							<xsl:text>No fixtures in preset</xsl:text><xsl:element name="br"/>
							<xsl:apply-templates select="PresetUsesPreset"/>
							<xsl:apply-templates select="PresetUsedByPreset"/>
						</xsl:when>
						<xsl:when test="not(UsedValuesFor/Fixture)">
							<xsl:attribute name="class">
								<xsl:choose>
									<xsl:when test="$presetClass = 'bodyOdd'">bodyOddExc</xsl:when>
									<xsl:otherwise>bodyEvenExc</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
							<xsl:text>No fixtures are in use</xsl:text><xsl:element name="br"/>
							<xsl:apply-templates select="PresetUsesPreset"/>
							<xsl:apply-templates select="PresetUsedByPreset"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="class"><xsl:value-of select="$presetClass"/></xsl:attribute>
							<xsl:apply-templates select="UsedValuesFor"/>
							<xsl:apply-templates select="PresetUsesPreset"/>
							<xsl:apply-templates select="PresetUsedByPreset"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$presetClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:choose>
						<xsl:when test="not(UsedValuesFor/Fixture) and not(UnusedValuesFor/Fixture)">
							<xsl:attribute name="class">
								<xsl:choose>
									<xsl:when test="$presetClass = 'bodyOdd'">bodyOddExc</xsl:when>
									<xsl:otherwise>bodyEvenExc</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
							No fixtures in preset
						</xsl:when>
						<xsl:when test="not(UnusedValuesFor/Fixture)">
							<xsl:attribute name="class">
								<xsl:choose>
									<xsl:when test="$presetClass = 'bodyOdd'">bodyOddExc</xsl:when>
									<xsl:otherwise>bodyEvenExc</xsl:otherwise>
								</xsl:choose>
							</xsl:attribute>
							All fixtures are in use
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="class"><xsl:value-of select="$presetClass"/></xsl:attribute>
							<xsl:apply-templates select="UnusedValuesFor"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="UsedValuesFor | UnusedValuesFor">
		<xsl:for-each select="Fixture">
			<xsl:sort select="." data-type="number"/>
			<xsl:value-of select="."/>
			<xsl:if test="position() != last()">, </xsl:if>
		</xsl:for-each>
		<xsl:element name="br"/>
	</xsl:template>
	<xsl:template match="PresetUsesPreset[Source] | PresetUsedByPreset[Source]">
		<xsl:element name="b">
			<xsl:choose>
				<xsl:when test="name(.) = 'PresetUsesPreset'"><xsl:text>Uses</xsl:text></xsl:when>
				<xsl:when test="name(.) = 'PresetUsedByPreset'"><xsl:text>Used by</xsl:text></xsl:when>
			</xsl:choose>
			<xsl:text> preset(s): </xsl:text>
		</xsl:element>
		<xsl:element name="br"/>
		<xsl:for-each select="Source">
			<xsl:sort select="@group" data-type="text"/>
			<xsl:sort select="@id" data-type="number"/>
			<xsl:value-of select="@group"/>
			<xsl:text> </xsl:text>
			<xsl:value-of select="@id"/>
			<xsl:text> [</xsl:text>
			<xsl:value-of select="@name"/>
			<xsl:text>]</xsl:text> 
			<xsl:element name="br"/>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
