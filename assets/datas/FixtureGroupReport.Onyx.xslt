<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="html" version="1.1" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<xsl:element name="html">
			<xsl:element name="head">
				<xsl:element name="link"><xsl:attribute name="rel">stylesheet</xsl:attribute><xsl:attribute name="type">text/css</xsl:attribute><xsl:attribute name="href">FixtureGroupReport.Onyx.css</xsl:attribute></xsl:element>
				<xsl:element name="title">"<xsl:value-of select="FixtureGroups/@showName"/>" - Onyx Fixture Group Summary</xsl:element>
			</xsl:element>
			<xsl:element name="body">
				<xsl:element name="h1">"<xsl:value-of select="FixtureGroups/@showName"/>" - Onyx Fixture Group Summary</xsl:element>
				<xsl:element name="p">
					<xsl:attribute name="class">body</xsl:attribute>
					This is a summary of the Onyx fixtures and fixture groups for show "<xsl:value-of select="FixtureGroups/@showName"/>"
				  <xsl:element name="b">
				    (requires software build
				    <xsl:if test="FixtureGroups/@showBuild &gt; 65535">
							<xsl:value-of select="(FixtureGroups/@showBuild - (FixtureGroups/@showBuild mod 16777216)) div 16777216"/>
							<xsl:text>.</xsl:text>
							<xsl:value-of select="((FixtureGroups/@showBuild - (FixtureGroups/@showBuild mod 65536)) div 65536) mod 256"/>
							<xsl:text>.</xsl:text>
						</xsl:if>
						<xsl:value-of select="FixtureGroups/@showBuild mod 65536"/><xsl:text>)</xsl:text>
					</xsl:element>
					<xsl:text>.</xsl:text>
				</xsl:element>
				<xsl:apply-templates select="FixtureGroups/Fixtures"/>
				<xsl:apply-templates select="FixtureGroups"/>
				<!--
				<xsl:element name="p">
					<xsl:attribute name="class">body</xsl:attribute>
					Page last updated: <xsl:value-of select="Manufacturers/@time"/> CET
				</xsl:element>
-->
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="FixtureGroups">
		<xsl:if test="FixtureGroup[@nr &lt; 0]">
			<xsl:element name="h2">Group Masters</xsl:element>
			<xsl:element name="table">
				<xsl:attribute name="class">table</xsl:attribute>
				<!-- <xsl:attribute name="border">1</xsl:attribute> -->
				<xsl:element name="thead">
					<xsl:element name="tr">
						<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Name</xsl:element>
						<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Fixtures</xsl:element>
					</xsl:element>
					<xsl:apply-templates select="FixtureGroup[@nr &lt; 0]" mode="GroupMaster">
						<xsl:sort select="@nr" data-type="number" order="descending"/>
					</xsl:apply-templates>
				</xsl:element>
			</xsl:element>
		</xsl:if>
		<xsl:element name="h2">Fixture Groups</xsl:element>
		<xsl:element name="table">
			<xsl:attribute name="class">table</xsl:attribute>
			<!-- <xsl:attribute name="border">1</xsl:attribute> -->
			<xsl:element name="thead">
				<xsl:element name="tr">
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>#</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Name</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Mask</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Fixtures</xsl:element>
				</xsl:element>
				<xsl:apply-templates select="FixtureGroup[@nr &gt; 0]">
					<xsl:sort select="@nr" data-type="number"/>
				</xsl:apply-templates>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="FixtureGroup">
		<xsl:variable name="fixtureClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tbody">
			<xsl:element name="tr">
				<xsl:attribute name="id"><xsl:value-of select="generate-id(.)"/></xsl:attribute>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:element name="b"><xsl:value-of select="@nr"/></xsl:element>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:element name="b"><xsl:value-of select="@name"/></xsl:element>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:apply-templates select="Mask"/>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:apply-templates select="Fixture"/>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="FixtureGroup" mode="GroupMaster">
		<xsl:variable name="fixtureClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tbody">
			<xsl:element name="tr">
				<xsl:attribute name="id"><xsl:value-of select="generate-id(.)"/></xsl:attribute>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:element name="b"><xsl:text disable-output-escaping="yes">&amp;#</xsl:text><xsl:value-of select="(-@nr) + 64"/>;</xsl:element>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:apply-templates select="Fixture"/>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Mask">
		<xsl:if test="boolean(number(@inverted)) = 'true'"><xsl:text>Except </xsl:text></xsl:if>
		<xsl:value-of select="@index + 1"/>
		<xsl:choose>
			<xsl:when test="@index = 0">st</xsl:when>
			<xsl:when test="@index = 1">nd</xsl:when>
			<xsl:when test="@index = 2">rd</xsl:when>
			<xsl:otherwise>th</xsl:otherwise>
		</xsl:choose>
		<xsl:text> of </xsl:text><xsl:value-of select="@type"/><xsl:text>
		</xsl:text><xsl:value-of select="."/><xsl:text> (fan through </xsl:text><xsl:value-of select="@spread"/><xsl:text>)</xsl:text>
	</xsl:template>
	<xsl:template match="FixtureGroup/Fixture">
		<xsl:if test="position() != 1"><xsl:text>, </xsl:text></xsl:if>
		<xsl:call-template name="FixtureHyperlink">
			<xsl:with-param name="Fixture" select="//Fixtures/Fixture[@ID = current()/@IDREF]"/>
			<xsl:with-param name="active" select="parent::*[Mask] and boolean(number(@active)) = 'true'"/>
		</xsl:call-template>
	</xsl:template>
	<xsl:template name="FixtureGroupName">
		<xsl:param name="FixtureGroup"/>
		<xsl:choose>
			<xsl:when test="$FixtureGroup/@nr &lt; 0"><xsl:text disable-output-escaping="yes">Groupmaster &amp;#</xsl:text><xsl:value-of select="(-@nr) + 64"/>;</xsl:when>
			<xsl:otherwise><xsl:value-of select="$FixtureGroup/@nr"/><xsl:text> - </xsl:text>"<xsl:value-of select="$FixtureGroup/@name"/>"</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="FixtureGroupHyperlink">
		<xsl:param name="FixtureGroup"/>
		<xsl:element name="a">
			<xsl:attribute name="href">#<xsl:value-of select="generate-id($FixtureGroup)"/></xsl:attribute>
			<xsl:call-template name="FixtureGroupName">
				<xsl:with-param name="FixtureGroup" select="$FixtureGroup"/>
			</xsl:call-template>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Fixtures">
		<xsl:element name="h2">Fixtures</xsl:element>
		<xsl:element name="table">
			<xsl:attribute name="class">table</xsl:attribute>
			<!-- <xsl:attribute name="border">1</xsl:attribute> -->
			<xsl:element name="thead">
				<xsl:element name="tr">
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>ID</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Name</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Manufacturer</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Model &amp; personality</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Universe</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Address</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Invert</xsl:element>
					<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Used in group(s)</xsl:element>
				</xsl:element>
				<xsl:apply-templates select="Fixture"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Fixtures/Fixture">
		<xsl:variable name="fixtureClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tbody">
			<xsl:element name="tr">
				<xsl:attribute name="id"><xsl:value-of select="generate-id(.)"/></xsl:attribute>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan">
						<xsl:value-of select="count(Part) + 1 + number(@totalMultiPatches)"/>
					</xsl:attribute>
					<xsl:element name="b"><xsl:value-of select="@nr"/></xsl:element>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
					<xsl:element name="b"><xsl:value-of select="@name"/></xsl:element>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
					<xsl:value-of select="@manufacturer"/>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
					<xsl:value-of select="@displayName"/>
				</xsl:element>
				<xsl:apply-templates select="DMXChannel[1]">
					<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
				</xsl:apply-templates>
				<xsl:for-each select="DMXChannel[position() &gt; 1]">
					<xsl:element name="tr">
						<xsl:apply-templates select=".">
							<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:for-each>
				<xsl:for-each select="Part">
					<xsl:element name="tr">
						<xsl:apply-templates select=".">
							<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:for-each>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
					<xsl:for-each select="//FixtureGroups/FixtureGroup[Fixture/@IDREF = current()/@ID]">
						<xsl:if test="position() != 1">,<xsl:element name="br"/></xsl:if>
						<xsl:call-template name="FixtureGroupHyperlink">
							<xsl:with-param name="FixtureGroup" select="."/>
						</xsl:call-template>
					</xsl:for-each>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
	<xsl:template match="Part">
		<xsl:param name="fixtureClass"/>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
			<xsl:element name="b">.<xsl:value-of select="@nr"/></xsl:element> : <xsl:value-of select="@name"/>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
			<xsl:value-of select="ancestor::Fixture/@manufacturer"/>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:attribute name="rowspan"><xsl:value-of select="count(DMXChannel)"/></xsl:attribute>
			<xsl:value-of select="ancestor::Fixture/@displayName"/>
		</xsl:element>
		<xsl:choose>
			<xsl:when test="DMXChannel">
				<xsl:apply-templates select="DMXChannel[1]">
					<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
				</xsl:apply-templates>
				<xsl:for-each select="DMXChannel[position() &gt; 1]">
					<xsl:element name="tr">
						<xsl:apply-templates select=".">
							<xsl:with-param name="fixtureClass" select="$fixtureClass"/>
						</xsl:apply-templates>
					</xsl:element>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<xsl:if test="parent::Fixture/DMXChannel">
					<xsl:element name="td">
						<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
						<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
						<xsl:attribute name="VALIGN">TOP</xsl:attribute>
						Auto
					</xsl:element>
					<xsl:element name="td">
						<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
						<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
						<xsl:attribute name="VALIGN">TOP</xsl:attribute>
						Auto
					</xsl:element>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template match="DMXChannel">
		<xsl:param name="fixtureClass"/>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:value-of select="@universe"/>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:value-of select="@startAddress"/>
		</xsl:element>
		<xsl:element name="td">
			<xsl:attribute name="class"><xsl:value-of select="$fixtureClass"/></xsl:attribute>
			<xsl:attribute name="ALIGN">CENTER</xsl:attribute>
			<xsl:attribute name="VALIGN">TOP</xsl:attribute>
			<xsl:if test="@panInverted and @panInverted != 0">P</xsl:if>
			<xsl:if test="@tiltInverted and @tiltInverted != 0">T</xsl:if>
			<xsl:if test="@panTiltSwapped and @panTiltSwapped != 0">S</xsl:if>
		</xsl:element>
	</xsl:template>
	<xsl:template name="FixtureName">
		<xsl:param name="Fixture"/>
		<xsl:value-of select="$Fixture/@nr"/>
		<xsl:if test="$Fixture/@name">
			<xsl:text> - </xsl:text>"<xsl:value-of select="$Fixture/@name"/>"
		</xsl:if>
	</xsl:template>
	<xsl:template name="FixtureHyperlink">
		<xsl:param name="Fixture"/>
		<xsl:param name="active"/>
		<xsl:element name="a">
			<xsl:attribute name="href">#<xsl:value-of select="generate-id($Fixture)"/></xsl:attribute>
			<xsl:choose>
				<xsl:when test="$active">
					<xsl:element name="b">
						<xsl:call-template name="FixtureName">
							<xsl:with-param name="Fixture" select="$Fixture"/>
						</xsl:call-template>
					</xsl:element>
				</xsl:when>
				<xsl:otherwise>
					<xsl:call-template name="FixtureName">
						<xsl:with-param name="Fixture" select="$Fixture"/>
					</xsl:call-template>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
